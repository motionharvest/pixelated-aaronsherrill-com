import { h } from "../pragma";
import jssLite from "../utils/jss-lite";

export const Reusable = (
  <div class="booger">Hello World!</div>
)

jssLite({
  ".booger" {
    color: "salmon"
  }
})