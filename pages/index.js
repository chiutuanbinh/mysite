import Head from 'next/head'
import { Calendar, Card, Col, Layout, Row, Image } from 'antd'
import 'antd/dist/antd.css'
import { getPrice } from '../lib/price'
import {PriceTag} from '../components/price'
const { Header, Footer, Sider, Content } = Layout
export default function Home({ prices }) {
  const pricesList = () => {
    return prices.map((o, i) => {
      let pr = {
        index : i,
        price: o
      };
      return (
        <PriceTag props={pr}></PriceTag>
      )
    });
  };
  return (
    <Layout>
      <Head>
        <title>STH</title>
      </Head>
      <Header>
        <Image width={50} src='/b.svg'></Image>
      </Header>
      <Layout>
        <Content style={{ padding: '0 50px' }}>Content
          <Row gutter={16}>
            <Col span={8}>
              <Card title='calendar'>
                <Calendar fullscreen={false} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Tin tức mới nhất'>

              </Card>
            </Col>
            <Col span={8}>
              <Card title='Thông tin thị trường'>
                {pricesList()}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Chiu Tuan Binh 2021 <br></br> Created with ant design</Footer>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  const pnjPrice = await getPrice('pnj')
  const sjcPrice = await getPrice('sjc')

  console.log(pnjPrice)
  return {
    props: {
      prices: [pnjPrice, sjcPrice]
    }
  }
}
