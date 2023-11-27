import { title } from '@/components/primitives'

interface TitleTextProps {
  text: string
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  return <h1 className={title()}>{text}</h1>
}

export default TitleText
