import type { NextApiRequest, NextApiResponse } from "next"
import { urlRegEx } from "../../utils/constants"
import { IPreviewData } from "../../utils/types"
import getMetaData from "metadata-scraper"

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const url: string = (req?.query?.url as string) || ""

  if (urlRegEx.test(url)) {
    const previewData: IPreviewData = {
      url: url,
    }
    await fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res?.text()
      })
      .then(async (data) => {
        const options = {
          html: data,
          url: url,
        }
        const metaData = await getMetaData(options)
        previewData["title"] = metaData.title
        previewData["image"] = metaData.image
        previewData["video"] = metaData.video as string
        previewData["description"] = metaData.description
      })
      .catch((err) => {
        console.error(err)
        res.status(400).json({ message: "Something went wrong!" })
      })
    res.status(200).json(previewData)
  } else {
    res.status(400).json({ message: "Something went wrong!" })
  }
}
export default index
