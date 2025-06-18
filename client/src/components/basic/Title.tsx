import { Typography, Breadcrumb } from '@material-tailwind/react'
import type { BreadcrumbType } from '../../constants/types'
import { Link } from 'react-router-dom'


type Props = {
  title: string
  breadcrumbs?: BreadcrumbType[]
}

const Title = ({ title, breadcrumbs }: Props) => {
  return (
    <section className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-2 mx-4 bg-transparent p-0">
          {breadcrumbs.map((crumb, idx) =>
            crumb.href && idx !== breadcrumbs.length - 1 ? (
              <Link
                key={crumb.label}
                to={crumb.href}
                className="text-blue-500 hover:underline text-lg font-semibold"
              >
                {crumb.label} /
              </Link>
            ) : (
                <span key={crumb.label} className="text-gray-500 text-lg font-semibold">
                {crumb.label}
              </span>
            )
          )}
        </Breadcrumb>
      )}
      <Typography variant="h3" className="font-bold text-teal-500 text-2xl text-center">
        {title}
      </Typography>
    </section>
  )
}

export default Title