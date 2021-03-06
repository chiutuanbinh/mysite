import {Card} from 'antd'

function ArticleMin({props}){
    
    return (
        <Card title={props.article.title} key={props.index}>
            <p>Publisher {props.article.publisher}</p>
            <p>Time {props.article.timestamp}</p>
        </Card>
    )
}

export {ArticleMin}