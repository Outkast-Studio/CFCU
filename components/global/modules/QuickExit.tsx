import { QuickExitType } from 'types/sanity'
import { clsx } from 'clsx'
export default function FastExitButton({ data }: { data: QuickExitType }) {
  const handleFastExit = () => {
    window.open(data?.exitUrl, '_blank')
    window.location.href = 'https://www.google.com'
  }

  return (
    <button
      onClick={handleFastExit}
      className={clsx(
        'font-codec-extra-bold text-white bg-alertRed flex gap-x-[6px] rounded-full py-[10.5px] px-[20px] fixed bottom-[31px] right-[36px] items-center',
      )}
    >
      <span>Fast Exit</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3904 4.11103L12.3904 10.475C12.3904 10.6077 12.3377 10.7349 12.2439 10.8287C12.15 10.9226 12.0228 10.9753 11.8901 10.9753C11.7574 10.9753 11.6302 10.9226 11.5364 10.8287C11.4425 10.7349 11.3898 10.6077 11.3898 10.475L11.3903 5.31798L4.46549 12.2428C4.37173 12.3365 4.24455 12.3892 4.11194 12.3892C3.97933 12.3892 3.85215 12.3365 3.75839 12.2428C3.66462 12.149 3.61194 12.0218 3.61194 11.8892C3.61194 11.7566 3.66462 11.6294 3.75839 11.5357L10.6832 4.61087L5.52615 4.61131C5.39347 4.61131 5.26622 4.5586 5.1724 4.46478C5.07858 4.37096 5.02588 4.24372 5.02588 4.11103C5.02588 3.97835 5.07858 3.8511 5.1724 3.75728C5.26622 3.66346 5.39347 3.61076 5.52615 3.61076L11.8901 3.61076C11.9558 3.61072 12.0209 3.62363 12.0816 3.64876C12.1423 3.67389 12.1975 3.71074 12.2439 3.7572C12.2904 3.80366 12.3273 3.85883 12.3524 3.91954C12.3775 3.98025 12.3904 4.04533 12.3904 4.11103Z"
          fill="white"
        />
      </svg>
    </button>
  )
}
