import React from 'react';
import { Panel, Image } from 'react-bootstrap';

export const VoterPanel = (props) => {
  const avatar = '/public/avatars/' + props.voter.avatar;
  let pannelStyle = props.voter.status === 'voted'?'primary':'default';
  const minVote = props.minVote;
  const maxVote = props.maxVote;
  const showVote = props.showVote;
  if (showVote && minVote && minVote !== maxVote) {
    pannelStyle = 'success';
  } 
  if (showVote && maxVote && minVote !== maxVote) {
    pannelStyle = 'danger';
  }
  const vote = props.voter.vote === ''?'?':props.voter.vote;
  return(
    <div className="voter-panel-main">
      <div className={ 'voter-panel-header ' + pannelStyle}>
        { props.voter.name }
      </div>
      <div className="voter-panel-avatar">
        <img src={ avatar } alt='avatar' className="avatar-image" />
      </div>
      <div>
        <Panel collapsible expanded={props.showVote}>
          <h1>{ vote }</h1>
        </Panel>
      </div>      
    </div>
  );
}