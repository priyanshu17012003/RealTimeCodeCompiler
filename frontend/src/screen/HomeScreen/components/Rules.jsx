import React from 'react';

function Rules() {
  return (
    <div className="rules-container"> {/* Add a class for styling */}
      <h2 style={{color: '#8e14f6',padding: '0.4rem'}}>Rules for Candidate</h2>
      <p style={{color: 'black',padding: '1rem', margin: '0.1rem', lineHeight: '2'}}>
        1. The candidate will be provided with an ID through their registered email. The ID will be used to connect to the host.<br />
        2. Candidate needs to paste that shared ID and then press the Connect button to join the host.<br />
        3. After the candidate joined the host, the candidate will be able to share their code with the host.<br />
        4. The candidate needs to press the Full Screen Button.<br />
        5. If the candidate presses the ESC button after going full screen, they will receive a first warning.<br />
        6. If the candidate presses the ESC button after the first warning, they will be out of the interview.
      </p>
      <hr style={{color: '#8e14f6'}}/>
      <h2 style={{color: '#8e14f6',padding: '0.4rem'}}>Rules for Host</h2>
      <p style={{color: 'black',padding: '1rem', margin: '0.1rem', lineHeight: '2'}}>
        1. The host needs to copy the ID from the 'Join as an Interviewer' section. The ID will be used to connect to the candidate.<br />
        2. The host needs to share that ID with the candidate through their registered email.<br />
        3. After the candidate joined the host, the host will be able to conduct the test.<br />
        4. The host can view the candidate's code.<br />
        5. If the candidate presses the ESC button after going full screen, they will receive a first warning.<br />
        6. If the candidate presses the ESC button after the first warning, they will be out of the interview.
      </p>
    </div>
  );
}

export default Rules;
