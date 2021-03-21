
import { ReadOutlined, MailOutlined, BoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { Layout, Menu, Row, Col, Card } from 'antd'
import { ArticleMin } from '../components/article';
import { PriceTag } from '../components/price';
import PageLayout from '../components/layout'
import { getAllPublisher, getLatest } from '../lib/article';
import { getPrice } from '../lib/price';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      articles: [],
    }
  }
  
  componentDidMount() {
    getPrice('PNJ').then((value) => {
      const pnjPrices = value
    })
  }

  render() {
    const prices = this.props.prices;
    const articles = this.props.articles;

    const pricesList = () => {
      return prices.map((o, i) => {
        let pr = {
          index: `price_${i}`,
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
          index: `article_${i}`,
          article: o
        };
        return (
          <ArticleMin props={pr}></ArticleMin>
        );
      });
    });


    return (
      <PageLayout title="STH" publishers={this.props.publishers}>
        <Content style={{ padding: '0 50px' }}>
          <Row gutter={24}>
            <Col span={16}>
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
      </PageLayout>

    );
  }
}


export async function getStaticProps(ctx) {
  const pnjPrice = await getPrice('PNJ');
  const sjcPrice = await getPrice('SJC');
  const articles = await getLatest(10);
  const publishers = await getAllPublisher();
  // console.log(articles)
  return {
    props: {
      prices: [pnjPrice, sjcPrice],
      articles: articles,
      publishers: publishers
    }
  };
}

export default Home;