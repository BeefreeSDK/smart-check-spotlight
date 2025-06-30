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
            <div className={styles.spinner}>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
            </div>
            <div className={styles.loadingText}>
              <h3>Beefree SDK - Smart Check Spotlight</h3>
            </div>
          </div>
        </div>
      )
    }
  </>
)

export { Loader }
