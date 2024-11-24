import Feature from 'app/pages/controller'
import { useSession } from 'protolib/lib/Session'

export default function ControllerPage(props:any) {
  useSession(props.pageSession)
  return <Feature.component {...props} />
}

export const getServerSideProps = Feature.getServerSideProps