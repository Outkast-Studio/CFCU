'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import dynamic from 'next/dynamic'
import { clsx } from 'clsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import { LocationPage, ATMLocation } from 'types/sanity'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import Button from 'components/global/ui/Button'

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const DynamicSearchBox = dynamic(
  //@ts-ignore
  () => import('@mapbox/search-js-react').then((mod) => mod.SearchBox),
  { ssr: false },
)

interface MapViewProps {
  locations: LocationPage[]
  initialCenter?: [number, number]
  initialZoom?: number
  atmLocations?: ATMLocation[]
}

interface PopupPosition {
  left: number
  top: number
}

export default function MapView({
  locations,
  initialCenter = [-84.5, 43.5],
  initialZoom = 5,
  atmLocations,
}: MapViewProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationPage | null>(
    null,
  )
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const [showATMs, setShowATMs] = useState(false)

  // Update popup position when map moves
  useEffect(() => {
    if (!map.current || !selectedLocation) return

    const updatePosition = () => {
      const markerPosition = [
        selectedLocation.coordinates.longitude,
        selectedLocation.coordinates.latitude,
      ]
      const point = map.current!.project(markerPosition as mapboxgl.LngLatLike)

      setPopupPosition({
        left: point.x + 30, // Offset to account for marker width
        top: point.y - 20, // Offset to align with marker
      })
    }

    // Update position initially and on map events
    updatePosition()
    map.current.on('move', updatePosition)
    map.current.on('zoom', updatePosition)

    return () => {
      if (map.current) {
        map.current.off('move', updatePosition)
        map.current.off('zoom', updatePosition)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: initialZoom,
      scrollZoom: false,
    })

    map.current.addControl(new mapboxgl.NavigationControl({}), 'top-right')
    map.current.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      }),
      'bottom-right',
    )

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.current?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle markers
  useEffect(
    () => {
      if (!map.current || !mapLoaded || locations.length === 0) return

      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      locations.forEach((location) => {
        const marker = document.createElement('div')
        const isActive = location.title === selectedLocation?.title
        marker.className = `marker cursor-pointer`
        marker.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22.5" cy="17.5" r="7.5" fill="white"/>
        <path d="M21.498 40.5913L21.4973 40.5908C21.222 40.3987 17.6758 37.8807 14.2035 33.8132C10.7243 29.7375 7.3751 24.1718 7.375 17.8753C7.37947 13.9978 8.92178 10.2804 11.6636 7.53859C14.4053 4.79685 18.1226 3.25455 22 3.25C25.8774 3.25455 29.5947 4.79685 32.3364 7.53859C35.0783 10.2805 36.6206 13.998 36.625 17.8756C36.6248 24.172 33.2757 29.7376 29.7965 33.8132C26.3242 37.8807 22.778 40.3987 22.5027 40.5908L22.502 40.5913C22.3549 40.6943 22.1796 40.7496 22 40.7496C21.8204 40.7496 21.6451 40.6943 21.498 40.5913ZM25.3334 12.8862C24.3467 12.2269 23.1867 11.875 22 11.875C20.4087 11.875 18.8826 12.5071 17.7574 13.6324C16.6321 14.7576 16 16.2837 16 17.875C16 19.0617 16.3519 20.2217 17.0112 21.2084C17.6705 22.1951 18.6075 22.9642 19.7039 23.4183C20.8003 23.8724 22.0067 23.9912 23.1705 23.7597C24.3344 23.5282 25.4035 22.9568 26.2426 22.1176C27.0818 21.2785 27.6532 20.2094 27.8847 19.0455C28.1162 17.8817 27.9974 16.6753 27.5433 15.5789C27.0892 14.4825 26.3201 13.5455 25.3334 12.8862Z" fill="${isActive ? '#800080' : '#F56600'}" stroke="white"/>
      </svg>`

        const newMarker = new mapboxgl.Marker(marker)
          .setLngLat([
            location.coordinates.longitude,
            location.coordinates.latitude,
          ])
          .addTo(map.current!)

        newMarker.getElement().addEventListener('click', () => {
          setSelectedLocation(location)

          // Calculate initial position for the popup
          const point = map.current!.project([
            location.coordinates.longitude,
            location.coordinates.latitude,
          ])
          setPopupPosition({
            left: point.x + 20,
            top: point.y - 20,
          })
        })

        markersRef.current.push(newMarker)
      })

      atmLocations?.forEach((atm: any) => {
        const marker = document.createElement('div')
        marker.className = `marker cursor-pointer ${showATMs ? 'block' : 'hidden'}`
        // Use a different marker style for ATMs
        marker.innerHTML = `<svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg" >
<rect x="0.5" y="0.5" width="34" height="32" rx="4.5" fill="#008566"/>
<rect x="0.5" y="0.5" width="34" height="32" rx="4.5" stroke="white"/>
<path d="M26.5 9H8.5C8.10218 9 7.72064 9.15804 7.43934 9.43934C7.15804 9.72064 7 10.1022 7 10.5V22.5C7 22.8978 7.15804 23.2794 7.43934 23.5607C7.72064 23.842 8.10218 24 8.5 24H26.5C26.8978 24 27.2794 23.842 27.5607 23.5607C27.842 23.2794 28 22.8978 28 22.5V10.5C28 10.1022 27.842 9.72064 27.5607 9.43934C27.2794 9.15804 26.8978 9 26.5 9ZM26.5 10.5V12.75H8.5V10.5H26.5ZM26.5 22.5H8.5V14.25H26.5V22.5ZM25 20.25C25 20.4489 24.921 20.6397 24.7803 20.7803C24.6397 20.921 24.4489 21 24.25 21H21.25C21.0511 21 20.8603 20.921 20.7197 20.7803C20.579 20.6397 20.5 20.4489 20.5 20.25C20.5 20.0511 20.579 19.8603 20.7197 19.7197C20.8603 19.579 21.0511 19.5 21.25 19.5H24.25C24.4489 19.5 24.6397 19.579 24.7803 19.7197C24.921 19.8603 25 20.0511 25 20.25ZM19 20.25C19 20.4489 18.921 20.6397 18.7803 20.7803C18.6397 20.921 18.4489 21 18.25 21H16.75C16.5511 21 16.3603 20.921 16.2197 20.7803C16.079 20.6397 16 20.4489 16 20.25C16 20.0511 16.079 19.8603 16.2197 19.7197C16.3603 19.579 16.5511 19.5 16.75 19.5H18.25C18.4489 19.5 18.6397 19.579 18.7803 19.7197C18.921 19.8603 19 20.0511 19 20.25Z" fill="white"/>
</svg>
`

        const newMarker = new mapboxgl.Marker(marker)
          .setLngLat([atm.longitude, atm.latitude])
          .addTo(map.current!)

        newMarker.getElement().addEventListener('click', () => {
          // Create a popup for ATM locations
          if (popupRef.current) {
            popupRef.current.remove()
          }

          popupRef.current = new mapboxgl.Popup({ offset: 25 })
            .setLngLat([atm.longitude, atm.latitude])
            .setHTML(
              `
            <div class="p-4">
              <h3 class="font-bold">${atm.name}</h3>
              <p class="text-gray-600">${atm.address}</p>
            </div>
          `,
            )
            .addTo(map.current!)
        })

        markersRef.current.push(newMarker)
      })
      return () => {
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      locations,
      mapLoaded,
      selectedLocation,
      showATMs,
      initialCenter,
      initialZoom,
    ],
  )

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div ref={mapContainer} className="w-full h-full absolute" />

      {mapLoaded && (
        <div
          className={clsx(
            'absolute top-[0px] right-left z-[10]',
            'lg:w-[450px] lg:p-4',
          )}
        >
          <DynamicSearchBox
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            map={map.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d)
            }}
            options={{
              country: 'US',
              language: 'en',

              proximity: {
                lng: -98.5795,
                lat: 39.8283,
              },
            }}
          />
        </div>
      )}

      <button
        onClick={() => setShowATMs((prev) => !prev)}
        className={clsx(
          'absolute bottom-[24px] right-[24px] z-[10] bg-orange rounded-[6px] px-[16px] py-[8px]',
        )}
      >
        Toggle ATM&apos;s
      </button>

      {selectedLocation && popupPosition && (
        <div
          className={clsx('absolute')}
          style={{
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top}px`,
            transform: 'translate(0%, -50%)', // Center horizontally and position above the point
          }}
        >
          <LocationCard
            data={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      )}

      <style jsx>{`
        .marker {
          cursor: pointer;
        }
        .marker-pin {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  )
}

const LocationCard = ({
  data,
  setSelectedLocation,
}: {
  data: LocationPage
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationPage | null>>
}) => {
  return (
    <article
      className={clsx('w-[428px] bg-white p-[30px] relative mapCardShadow')}
    >
      <button
        onClick={() => setSelectedLocation(null)}
        className={clsx(
          'bg-orange w-[48px] h-[48px] rounded-full flex items-center justify-center absolute top-[-24px] right-[-24px]',
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.281 18.2194C19.3507 18.289 19.406 18.3718 19.4437 18.4628C19.4814 18.5539 19.5008 18.6514 19.5008 18.75C19.5008 18.8485 19.4814 18.9461 19.4437 19.0372C19.406 19.1282 19.3507 19.2109 19.281 19.2806C19.2114 19.3503 19.1286 19.4056 19.0376 19.4433C18.9465 19.481 18.849 19.5004 18.7504 19.5004C18.6519 19.5004 18.5543 19.481 18.4632 19.4433C18.3722 19.4056 18.2895 19.3503 18.2198 19.2806L12.0004 13.0603L5.78104 19.2806C5.64031 19.4213 5.44944 19.5004 5.25042 19.5004C5.05139 19.5004 4.86052 19.4213 4.71979 19.2806C4.57906 19.1399 4.5 18.949 4.5 18.75C4.5 18.551 4.57906 18.3601 4.71979 18.2194L10.9401 12L4.71979 5.78061C4.57906 5.63988 4.5 5.44901 4.5 5.24999C4.5 5.05097 4.57906 4.8601 4.71979 4.71936C4.86052 4.57863 5.05139 4.49957 5.25042 4.49957C5.44944 4.49957 5.64031 4.57863 5.78104 4.71936L12.0004 10.9397L18.2198 4.71936C18.3605 4.57863 18.5514 4.49957 18.7504 4.49957C18.9494 4.49957 19.1403 4.57863 19.281 4.71936C19.4218 4.8601 19.5008 5.05097 19.5008 5.24999C19.5008 5.44901 19.4218 5.63988 19.281 5.78061L13.0607 12L19.281 18.2194Z"
            fill="#3C1053"
          />
        </svg>
      </button>
      <div className={clsx('aspect-w-16 aspect-h-9')}>
        <Image
          src={urlForImage(data?.thumbnailImage).url()}
          alt={data?.thumbnailImage?.alt as string}
          fill
          className={clsx('object-cover w-full h-full')}
        />
      </div>
      <h4
        className={clsx(
          'mt-[25px] text-[32px] font-codec-extra-bold text-lavender ',
        )}
      >
        {data?.title}
      </h4>
      <div
        className={clsx(
          'flex gap-x-[6px] items-start font-codec-news text-[18px] leading-[27px] text-black/75 mt-[12px]',
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6937 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6937 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
            fill="#F56600"
          />
        </svg>
        <h5>{data?.address}</h5>
      </div>
      <div
        className={clsx(
          'flex gap-x-[6px] items-start font-codec-news text-[18px] leading-[27px] text-black/75 mt-[8px]',
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.8472 14.8557L16.4306 12.8766L16.4184 12.871C16.1892 12.7729 15.939 12.7336 15.6907 12.7565C15.4424 12.7794 15.2037 12.8639 14.9963 13.0022C14.9718 13.0184 14.9484 13.0359 14.9259 13.0547L12.6441 15.0001C11.1984 14.2979 9.70595 12.8166 9.00376 11.3897L10.9519 9.07318C10.9706 9.04974 10.9884 9.0263 11.0053 9.00099C11.1407 8.79409 11.2229 8.55692 11.2445 8.31059C11.2661 8.06427 11.2264 7.81642 11.1291 7.58912V7.57787L9.14438 3.1538C9.0157 2.85687 8.79444 2.60951 8.51362 2.44865C8.2328 2.2878 7.9075 2.22208 7.58626 2.2613C6.31592 2.42847 5.14986 3.05234 4.30588 4.01639C3.4619 4.98045 2.99771 6.21876 3.00001 7.50005C3.00001 14.9438 9.05626 21.0001 16.5 21.0001C17.7813 21.0024 19.0196 20.5382 19.9837 19.6942C20.9477 18.8502 21.5716 17.6841 21.7388 16.4138C21.7781 16.0927 21.7125 15.7674 21.5518 15.4866C21.3911 15.2058 21.144 14.9845 20.8472 14.8557ZM16.5 19.5001C13.3185 19.4966 10.2682 18.2312 8.01856 15.9815C5.76888 13.7318 4.50348 10.6816 4.50001 7.50005C4.49648 6.58458 4.82631 5.69911 5.42789 5.00903C6.02947 4.31895 6.86167 3.87143 7.76907 3.75005C7.7687 3.7538 7.7687 3.75756 7.76907 3.7613L9.73782 8.16755L7.80001 10.4869C7.78034 10.5096 7.76247 10.5337 7.74657 10.5591C7.60549 10.7756 7.52273 11.0249 7.5063 11.2827C7.48988 11.5406 7.54035 11.7984 7.65282 12.031C8.5022 13.7682 10.2525 15.5054 12.0084 16.3538C12.2428 16.4652 12.502 16.5139 12.7608 16.4952C13.0196 16.4765 13.2692 16.3909 13.485 16.2469C13.5091 16.2307 13.5322 16.2132 13.5544 16.1944L15.8334 14.2501L20.2397 16.2235C20.2397 16.2235 20.2472 16.2235 20.25 16.2235C20.1301 17.1322 19.6833 17.9661 18.9931 18.5691C18.3028 19.1722 17.4166 19.5031 16.5 19.5001Z"
            fill="#F56600"
          />
        </svg>

        <h5>{data?.phoneNumber}</h5>
      </div>
      <Link
        href={`locations/${data?.slug.current}`}
        className={clsx('block mt-[25px]')}
      >
        <Button
          label={'More Info'}
          className={clsx('!bg-lavender !text-white')}
        />
      </Link>
    </article>
  )
}
