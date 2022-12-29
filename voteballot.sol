// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract Ballot {
    struct Voter{
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }

    struct Proposal {
        bytes32 name;
        uint voteCount;
        address  chairperson;

    }

    mapping (address => Voter) public voters;
    Proposal[] public proposals;

    constructor (bytes32[] memory proposalNames){
        chairperson = msg.sender;
        voters[chairperson].weight =1;
        
        // for each proposal names, create new proposal object and add to
        //end of array
        for (uint i=0; i <proposalNames.length; i++){
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount : 0

            }));
        }


    }

    //Giving voter the right to vote on the ballot

    function giveRightToVote(address[] calldata newvoter) external {
        require(
            msg.sender == chairperson,
            "Only chairperson can give the right to vote"
        );
        for (uint i=0; i<newvoter.length ; i++){
        require(
            !voters[newvoter[i]].voted
            "The voter has already voted"

        );

        require(voters[newvoter[i]].weight == 0);
        voters[newvoter[i]].weight = 1;
        }

    }

    function delegate(address to ) external{
        //assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted");

        require(to != msg.sender, "Self-delegation is disallowed.");

        // caution while making such loops

        while(voters[to].delegate != address(0)){
            to=voters[to].delegate;

            require(to !=msg.sender , "found loop in delegation");

        }

        //Since "sender is a reference , this modifies voters[msg.sender].voted
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ =voters[to];
        if (delegate_.voted){
            //if the delegate already voted, directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;

        }else {
            //If delegate didnot vote yet add to her weight.
            delegate_.weight += sender.weight;
        }



    }

    function vote(uint proposal) external{
        Voter storage sender = voters[msg.sender];
        require(sender.weight !=0, "Has no right to vote");
        require(!sender.voted, "Already Voted");
        sender.voted =true;
        sender.vote = proposal;
        proposals[proposal].voteCount += sender.weight;


    }

    function winningProposal() public view returns (uint winningProposal_){
        uint winningVoteCount = 0;
        for (uint p = 0; proposals.length; p++){
            if (proposals[p].voteCount > winningVoteCount){
                winningVoteCount=proposals[p].votecount ;
                winningProposal_=p;
            }
        }
    }

    function winnerName() external view returns(bytes32 winnerName_)
    {
        winnerName_=proposals[winningProposal()].name;
    }


} 