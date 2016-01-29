import React from "react";
import Relay from 'react-relay';
import {debounce} from 'lodash';

import Link from './link';
import CreateLinkMutation from '../mutations/create-link-mutation';

class Main extends React.Component {
    constructor(props) {
        super(props)
        //this.search = debounce(this.search, 300);
    }
    
    search = (e) => {
        e.persist();
        let query = e.target.value;
        this.props.relay.setVariables({
            query: query
        })
    };
    
    setLimit = (e) => {
        let newLimit = Number(e.target.value);
        this.props.relay.setVariables({limit: newLimit});
    };
    
    handleSubmit = (e) => {
      e.preventDefault();
      Relay.Store.commitUpdate(
          new CreateLinkMutation({
              title: this.refs.newTitle.value,
              url: this.refs.newUrl.value,
              store: this.props.store
          })
      );
      this.refs.newTitle.value = '';
      this.refs.newUrl.value = '';  
    };
    
	render() {
		let content = this.props.store.linkConnection.edges.map(edge => {
			return <Link key={edge.node.id} link={edge.node} />;
		});
		return (
			<div className="row"> 
                <div className="col-md-12">
                
                    <div className="row"> 
                        <div className="col-md-12">
                            <h3>Links</h3>
                            <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" placeholder="Title" ref="newTitle" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Url" ref="newUrl" className="form-control"/>
                                </div>
                                
                                <button className="btn btn-default" type="submit">Add</button>
                            </form>
                        </div>
                    </div>
                    
                    <div className="row"> 
                        <div className="col-md-12">
                            <div className="form-inline">
                                Showing: &nbsp;
                                <input type="text" placeholder="Search" onChange={this.search} className="form-control" />
                                <select className="form-control" onChange={this.setLimit}
                                        defaultValue={this.props.relay.variables.limit}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row"> 
                        <div className="col-md-12">
                            <div className="list-group">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

Main = Relay.createContainer(Main, {
    initialVariables: {
        limit: 20,
        query: ''
    },
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id,
                linkConnection(first: $limit, query: $query) {
                    edges {
                        node {
                            id,
                            ${Link.getFragment('link')}
                        }
                    }
                }
            }
        `
    }
});

export default Main;