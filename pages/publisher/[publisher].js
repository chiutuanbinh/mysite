import {Col,Card, Row, Layout} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { ArticleMin } from '../../components/article';
import PageLayout from '../../components/layout'
import { getAllPublisher, getPublisherLatest } from '../../lib/article';

const {Content} = Layout;

class PublisherHomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const articleList = this.props.articles;
        const publisherLatest = () => {
            return articleList.map((o, i) => {
                o.publisher= this.props.publisherName;
                let pr = {
                    index: `a_${i}`,
                    article: o
                };
                return (
                    <ArticleMin props={pr}></ArticleMin>
                );
            });
        };
        return (
            <PageLayout title="STM" publishers={this.props.publishers}>
                <Content style={{ padding: '0 50px' }}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title='Tin tức mới nhất'>
                                {publisherLatest()}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </PageLayout>
        );
    };
}

export async function getStaticPaths() {
    let publisherList = await getAllPublisher();
    const paths = publisherList.map((o, i) => {
        return {
            params: {
                publisher: o
            }
        }
    });
    // console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const publisherName = params.publisher;
    const articles = await getPublisherLatest(params.publisher, 10);
    const publisherList = await getAllPublisher();
    return {
        props: {
            publisherName: publisherName,
            articles: articles,
            publishers: publisherList
        }
    };
}

export default PublisherHomePage;