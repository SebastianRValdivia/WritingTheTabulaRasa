
import { api } from "boot/axios"

import { recursiveGetCall } from "src/utils/api"

export default {
  async getQuotes() {
    let result = await recursiveGetCall("v1/quotes/")

    if (result) {
      return {
        code: 200,
        data: result.data
      }
    } else return false
  }
}
