const addMessage = (details,priority = false) => new CustomEvent('addmessage',{
    detail:details,
    priority,
});
export default addMessage;