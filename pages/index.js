
import { ReadOutlined, MailOutlined, BoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { Layout, Menu, Row, Col, Card } from 'antd'
import { ArticleMin } from '../components/article';
import { PriceTag } from '../components/price';
import PageLayout from '../components/layout'
import { getAllPublisher, getLatest,getArticle ,getCluster, getAllCategory} from '../lib/article';
import { getPrice } from '../lib/price';
import React from 'react';
import { ClusterMin } from '../components/cluster';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: new Array(2).fill(0).map((v,i) => {
        return {
          'gType': '',
        }
      }),
      articles: [],
    }
  }
  
  componentDidMount() {
    getPrice('PNJ').then((value) => {
      let oldPrices = this.state.prices;
      oldPrices[1] = value;
      this.setState({prices:oldPrices});
    }).catch(err => {
      console.error(err);
    });
    getPrice('SJC').then((value) => {
      let oldPrices = this.state.prices;
      oldPrices[0] = value;
      this.setState({prices:oldPrices});
    }).catch(err => {
      console.error(err);
    });

    getLatest(10).then((value)=> {
      this.setState({articles:value});
    }).catch(err => {
      console.error(err);
    });
  }

  render() {

    let articles = Array.from(this.state.articles).map((o, i) => {
      let pr = {
        index: `article_${i}`,
        article: o
      };
      return (
        <ArticleMin props={pr}></ArticleMin>
      );});

    let prices = Array.from(this.state.prices).map((o, i) => {
      let pr = {
        index: `price_${i}`,
        price: o
      };
      return (
        <PriceTag props={pr}></PriceTag>
      );});

    return (
      <PageLayout title="STH" publishers={this.props.publishers} categories={this.props.categories}>
        <Content style={{ padding: '0 50px' }}>
          <Row gutter={24}>
            <Col span={16}>
              <Card title='Tin tức mới nhất'>
                {articles}
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Thông tin thị trường'>
                {prices}
              </Card>
            </Col>
          </Row>
        </Content>
      </PageLayout>

    );
  }
}


export default Home;