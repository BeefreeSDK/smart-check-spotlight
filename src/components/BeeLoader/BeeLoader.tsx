import styles from './BeeLoader.module.scss'

type LoaderProps = {
  fullHeight: boolean
  show: boolean
}

const Loader = ({ fullHeight, show }: LoaderProps) => (
  <>
    {
      show && (
        <div className={styles.Loader} style={{ height: fullHeight ? '100vh' : 'auto' }}>
          Loading...
        </div>
      )
    }
  </>
)

export { Loader }
