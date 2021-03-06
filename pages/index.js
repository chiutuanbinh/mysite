import Head from 'next/head'
import { Calendar, Card, Col, Layout, Row, Image } from 'antd'
import 'antd/dist/antd.css'
import { getPrice } from '../lib/price'
import { getLatest } from '../lib/article'
import {PriceTag} from '../components/price'
import {ArticleMin} from '../components/article'

const { Header, Footer, Sider, Content } = Layout

export default function Home({ prices, articles }) {
  const pricesList = () => {
    return prices.map((o, i) => {
      let pr = {
        index : `price_${i}`,
        price: o
      };
      return (
        <PriceTag props={pr}></PriceTag>
      )
    });
  };
  const articleList = (() => {
    return articles.map((o, i) => {
      let pr = {
        index :`article_${i}`,
        article : o
      };
      return (
        <ArticleMin props={pr}></ArticleMin>
      )
    })
  })
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
                {articleList()}
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
  const pnjPrice = await getPrice('PNJ');
  const sjcPrice = await getPrice('SJC');
  const articles = await getLatest(10);

  console.log(pnjPrice)
  return {
    props: {
      prices: [pnjPrice, sjcPrice],
      articles : articles
    }
  }
}
