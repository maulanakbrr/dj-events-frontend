import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/EventItem.module.scss'

const EventItem = ({evt}) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image 
          src={evt.image ? evt.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'} 
          alt={evt.slug ? evt.slug : 'default-image'}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>{new Date(evt.date).toLocaleString('id-ID')} at {evt.time}</span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem