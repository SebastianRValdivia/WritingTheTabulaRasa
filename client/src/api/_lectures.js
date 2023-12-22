import { api } from "boot/axios";
import { recursiveGetCall } from "src/utils/api"

export default {
  async getLecturesLite() {
    let result = await recursiveGetCall(
      "v1/lectures/lite/"
    )
    return result
  },
}
