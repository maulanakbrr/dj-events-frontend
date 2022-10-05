import React from 'react'
import Link from 'next/link'

const LinkWrapper = ({href, children, ...props}) => {
  if (href === "#") {
    return <>{children}</>
  } else {
    return <Link href={href} {...props}>
      {children}
    </Link>
  }
}

export default LinkWrapper