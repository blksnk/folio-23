import Lines from "@/components/Lines";
import PageLayout from "@/layouts/PageLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import TitleGrid from "@/components/TitleGrid";

interface DelayFetchOptions extends RequestInit {
  delay: number;
}

const delayFetch = <TData,>(url: string, options: DelayFetchOptions) =>
  new Promise<TData>((resolve) => {
    setTimeout(() => resolve(fetch(url, options) as TData)
      ,options.delay)
  })

const api = 'https://jsonplaceholder.typicode.com/photos'

const loadDataFromServer = async ()=> {
  const response = await delayFetch(api, {delay: 10000})
  return response.json() as {title: string}[]
}

export default async function Project({ params }: { params: { uid: string } }) {
  const projects = await loadDataFromServer()
  console.log(projects)
  return (
    <PageLayout paddingTop>
      <span>Project id {params.uid}</span>
      <TitleGrid title={projects[0].title}/>
    </PageLayout>
  )
}
