import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = formValue => formValue && formValue.length;
const maxLength = maxLength => formValue => !formValue || (formValue.length <= maxLength);
const minLength = minLength => formValue=> formValue && (formValue.length >= minLength);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  
  handleSubmit(values) {
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
}

  render() {
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil-square-o fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <div className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select id="rating" model=".rating" name="rating" className="form-control" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <Label htmlFor="author">Author</Label>
                  <Control.text id="author" model=".author" name="author" className="form-control"                                         validators={{
                      required, 
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                  }}>
                  </Control.text>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be at least 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                />
                </div>
                <div className="form-group">
                  <Label htmlFor="feedback">Feedback</Label>
                    <Control.textarea id="feedback" model=".feedback" name="feedback" rows="6" className="form-control">
                    </Control.textarea>
                </div>
                <Button type="submit" value="submit" color="primary">Submit Comment</Button>
              </LocalForm>
            </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
            <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
      </Card>
    </div>
  );
}


function RenderComments({comments, postComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {console.log(comments)}
        {comments.map(comment =>
        <div className="mb-3" key={comment.id}>
          <div> {comment.text}</div>
          <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>
        </div>
        )}
      <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
}


function CampsiteInfo(props) {

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments 
            comments={props.comments} 
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  } 
  return <div />
}



export default CampsiteInfo;