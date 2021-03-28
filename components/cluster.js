import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { ArticleMin } from './article';
function ClusterMin({ props }) {
    const articles = () => {
        return props.articles.map((o, i) => {
            let pr = {
                index:`article_${i}`,
                article:o
            };
            return <ArticleMin props={pr}>
            </ArticleMin>
        });
    };
    return (
        <Card hoverable key={props.index}>
            <Meta title={props.index}></Meta>
            {articles()}
        </Card>
    )
}

export { ClusterMin };