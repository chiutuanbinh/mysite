import { Card } from "antd";

export function PriceTag({props}){
  console.log("DAFUC");
  return (
    <Card title={props.price.gType} key={props.index}>
      <p>Mua vào :{props.price.buy}</p>
      <p>Bán ra :{props.price.sell}</p>
    </Card>
  )
}