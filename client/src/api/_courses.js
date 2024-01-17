import { api } from "boot/axios";
import { recursiveGetCall } from "src/utils/api"

export default {
  async getLectures() {
    let result = await recursiveGetCall(
      "v1/courses/lectures/"
    )
    return result
  },
}
