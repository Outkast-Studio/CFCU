import { LocationPage } from 'types/sanity'
import { clsx } from 'clsx'
import Link from 'next/link'
import Button from '../global/ui/Button'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import defaultSubPage from 'public/images/defaultSubPage.png'
import LocationHours from 'components/locations/LocationHours'
import PageLink from 'components/global/ui/PageLink'

const LocationPageComponent = ({ data }: { data: LocationPage }) => {
  return (
    <main className={clsx('')}>
      <section
        className={clsx(
          'pt-[60px] px-[24px] relative',
          'bg-lavender lg:px-[48px] lg:py-[201px]  items-end',
        )}
      >
        <Link href={'/'} className={clsx('block w-fit focus:!shadow-none')}>
          <Image
            src={'/icons/LogoFull.png'}
            alt={'Community Financial Logo'}
            width={500}
            height={108}
            priority
            className={clsx(
              'w-[212px] relative z-[2]',
              'lg:w-[244.71px] lg:absolute lg:top-[48px] lg:left-[48px] ',
            )}
          />
        </Link>
        <Image
          src={defaultSubPage}
          priority
          alt="origami"
          fill
          className={clsx('w-full h-full object-cover absolute top-0 left-0')}
        />
        <div
          className={clsx(
            'gap-y-[35px] flex flex-col-reverse mt-[48px] pb-[60px]',
            'lg:grid lg:grid-cols-2 lg:gap-x-[24px] lg:max-w-[1800px] xl:px-[0px] lg:mx-auto lg:items-end',
          )}
        >
          <article className={clsx('relative z-[2]')}>
            <Link href={'/locations'} className={clsx('block')}>
              <button
                className={clsx(
                  'flex gap-x-[6px] py-[8px] px-[16px] rounded-full items-center bg-[#2C0A3D]',
                )}
              >
                <svg
                  width="5"
                  height="9"
                  viewBox="0 0 5 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.86046 8.51528L0.110455 4.76528C0.075589 4.73045 0.0479291 4.68909 0.0290578 4.64357C0.010186 4.59804 0.000473317 4.54925 0.000473319 4.49996C0.000473321 4.45068 0.010186 4.40189 0.0290578 4.35636C0.0479291 4.31084 0.075589 4.26948 0.110455 4.23465L3.86046 0.484652C3.93082 0.414287 4.02626 0.374756 4.12577 0.374756C4.22528 0.374756 4.32072 0.414287 4.39108 0.484652C4.46145 0.555017 4.50098 0.650453 4.50098 0.749964C4.50098 0.849476 4.46145 0.944912 4.39108 1.01528L0.905924 4.49996L4.39108 7.98465C4.42592 8.01949 4.45356 8.06086 4.47242 8.10638C4.49127 8.1519 4.50098 8.20069 4.50098 8.24996C4.50098 8.29924 4.49127 8.34803 4.47242 8.39355C4.45356 8.43907 4.42592 8.48044 4.39108 8.51528C4.35624 8.55012 4.31488 8.57776 4.26935 8.59661C4.22383 8.61547 4.17504 8.62517 4.12577 8.62517C4.07649 8.62517 4.0277 8.61547 3.98218 8.59661C3.93666 8.57776 3.8953 8.55012 3.86046 8.51528Z"
                    fill="#F56600"
                  />
                </svg>
                <span className={clsx('font-codec-pro text-white')}>
                  Locations
                </span>
              </button>
            </Link>
            <h1
              className={clsx(
                'mt-[11px] title-m',
                'text-white lg:text-[90px] lg:leading-[99px] font-codec-heavy lg:mt-[26px]',
              )}
            >
              {data?.title}
            </h1>
            <div
              className={clsx(
                'mt-[22px] grid grid-cols-2',
                'lg:mt-[55px] gap-x-[24px] gap-y-[37px]',
              )}
            >
              <DetailCard subtitle="Address" content={data?.address} />
              <DetailCard subtitle="Phone" content={data?.phoneNumber} />

              <div className={clsx('flex flex-col gap-y-[6px]')}>
                <h6
                  className={clsx(
                    'subtitle-s text-white/70 font-codec-news uppercase',
                    'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
                  )}
                >
                  Services
                </h6>
                <ul
                  className={clsx(
                    'w-paragraph-s-desktop text-white font-codec-news flex flex-col gap-y-[6px]',
                    'lg:text-[18px] lg:leading-[27px]',
                  )}
                >
                  {data?.services?.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className={clsx('flex flex-col gap-y-[42px]')}>
                <DetailCard subtitle="FAX" content={data?.faxNumber} />
                <DetailCard
                  subtitle="Mailing Address"
                  content={data?.mailingAddress}
                />
              </div>
            </div>
            {data?.appointmentLink && (
              <PageLink
                data={data?.appointmentLink}
                className={clsx('mt-[57px] block')}
              >
                <Button label={data?.appointmentLink?.title} />
              </PageLink>
            )}
          </article>
          <div className={clsx('aspect-w-8 aspect-h-7 w-full')}>
            <Image
              src={urlForImage(data?.thumbnailImage).url()}
              alt=""
              fill
              className={clsx('object-cover w-full h-full')}
            />
          </div>
        </div>
      </section>
      <div className={clsx('mt-[111px]')}>
        <LocationHours data={data?.hours} />
      </div>
    </main>
  )
}

export default LocationPageComponent

function DetailCard({
  subtitle,
  content,
}: {
  subtitle: string
  content: string
}) {
  return (
    <div className={clsx('max-w-[200px] flex flex-col gap-y-[6px]')}>
      <h6
        className={clsx(
          'subtitle-s text-white/70 font-codec-news uppercase',
          'lg:text-[14px] lg:leading-[14px] lg:tracking-[1.6px]',
        )}
      >
        {subtitle}
      </h6>
      <p
        className={clsx(
          'w-paragraph-s-desktop text-white font-codec-news',
          'lg:text-[18px] lg:leading-[27px]',
        )}
      >
        {content}
      </p>
    </div>
  )
}
