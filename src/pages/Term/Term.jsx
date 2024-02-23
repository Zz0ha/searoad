import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPrivacyTerm, getUseTerm } from 'apis/term';

import { StDivTerm } from './Term.style';

const Term = (props) => {
  const { termType } = useParams();
  const [termHtml, setTermHtml] = useState('');

  let response;
  if(termType === 'use-term') {
    response = getUseTerm({respType: 'html'});
  } else if(termType === 'privacy-term') {
    response = getPrivacyTerm({respType: 'html'});
  } else {
    console.log(`wrong term type: ${termType}`);
    return <div>잘못된 접근입니다.</div>
  }

  response.then((res) => res.json())
  .then((res) => {
    setTermHtml(res.resMsg.html_content);
  });

  return (
    <StDivTerm className="container">
      <div dangerouslySetInnerHTML={{__html: termHtml}} />
    </StDivTerm>
  )
}

export default Term;
