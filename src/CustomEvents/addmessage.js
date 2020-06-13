const addMessage = (details) => new CustomEvent('addmessage',{
    detail:details
});
export default addMessage;