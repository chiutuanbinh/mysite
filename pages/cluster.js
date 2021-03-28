
import { Card, Col, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { ClusterMin } from '../components/cluster';
import PageLayout from '../components/layout';
import { PriceTag } from '../components/price';
import { getAllPublisher, getArticle, getCluster } from '../lib/article';
import { getPrice } from '../lib/price';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Cluster extends React.Component {
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
    const clusters = this.props.clusters;

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

    const clusterList = () => {
      return clusters.map((o) => {
        let pr = {
          index: `cluster_${o.id}`,
          articles: o.member
        }
        return (
          <ClusterMin props={pr}></ClusterMin>
        )
      })
    }


    return (
      <PageLayout title="STH" publishers={this.props.publishers}>
        <Content style={{ padding: '0 50px' }}>
          <Row gutter={24}>
            <Col span={16}>
              <Card title='Chủ đề mới nhất'>
                {clusterList()}
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
  let clusters = await getCluster(5);
  clusters = clusters.map((o)=>{
    // console.log(o['member'])
    const size = Math.min(o['member'].length, 10);
    return {'id': o['cid'], 'member': o['member'].splice(0, size)};
  });
  let datas = [];
  let i;
  for (i = 0 ; i < clusters.length;i ++){
    let c = clusters[i];
    const articleData = await Promise.all(c.member.map(x => getArticle(x)));
    datas.push({'id':c.id, 'member':articleData});
  } 
  
  const publishers = await getAllPublisher();

  return {
    props: {
      prices: [pnjPrice, sjcPrice],
      publishers: publishers,
      clusters: datas
    }
  };
}

export default Cluster;