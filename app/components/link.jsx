import React from 'react';
import Relay from 'react-relay'; 
import moment from 'moment';

class Link extends React.Component {
    dateLabel = () => {
        let {link, relay} = this.props;
        
        if(relay.hasOptimisticUpdate(link)) {
            return 'Saving...';
        }
        
        return moment(link.createdAt).format('L');
    }; 
    render() {
        let {link} = this.props;
        return (
            <a className="list-group-item" href={link.url}>
                {link.title}
                <span className="badge">{this.dateLabel()}</span>
            </a>
        );
    };
}

Link = Relay.createContainer(Link, {
   fragments: {
       link: () => Relay.QL`
        fragment on Link {
            url,
            title,
            createdAt
        }
       `
   } 
});

export default Link;