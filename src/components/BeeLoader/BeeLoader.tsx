import styles from './BeeLoader.module.scss'

type LoaderProps = {
  show: boolean
}

const Loader = ({ show }: LoaderProps) => (
  <>
    {
      show && (
        <div className={styles.Loader}>
          <div className={styles.loaderContent}>
            Loading...
          </div>
        </div>
      )
    }
  </>
)

export { Loader }
