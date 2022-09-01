import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, Button } from 'react-bootstrap';

import moment from 'moment';

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    let posts = [];
    if(data){
        posts = data.getPosts;
    }

    const likePost = () => {
        console.log("Like Post");
    }

    const commentOnPost = () => {
        console.log("Comment");
    }

    return (
        <Container className="home">
            <Row>
                <h1>Recent Posts</h1>
            </Row>
            <Row>
                {
                    loading
                    ?
                    (
                        <h1>Loading posts...</h1>
                    )
                    :
                    posts && posts.map(post => (
                        <Col sm="4" md="4" lg="4" key={post.id}>
                            <Card className="profile-card">
                                <Row>
                                    <Col>
                                        {post.username}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardImg style={{height: '100px', width: '100px'}} src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="></CardImg>
                                    </Col>
                                    <Col>
                                        {post.body}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Link} to={`/posts/${post.id}`}>
                                        {moment(post.createdAt).fromNow(true)}
                                    </Col>
                                </Row>
                                <Row style={{marginBottom: "15px"}}>
                                    <Col sm="7" md="7" lg="7">Likes: {post.likeCount}</Col>
                                    <Col sm="5" md="5" lg="5">
                                        <Button type="button" className="like-button" onClick={likePost}>Like!</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" md="5" lg="5">Comments: {post.commentCount}</Col>
                                    <Col sm="7" md="7" lg="7">
                                        <Button type="button" className="comment-button" onClick={commentOnPost}>Comment!</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

        </Container>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id,
            body,
            createdAt,
            username,
            likeCount,
            likes{
                username
            },
            commentCount,
            comments{
                id,
                username,
                createdAt,
                body
            }
        }

    }
`

export default Home;