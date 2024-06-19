import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";
import { Ref, ref } from "vue";

class PageData {
  async getATAlist() {
    const res = (await http({
      url: "/all_load_status",
      method: "GET",
    })) as MyResponse<undefined>;
  }
}

export { PageData };
