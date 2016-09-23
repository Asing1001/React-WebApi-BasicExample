
var GetSessionIdForm = React.createClass({
    getInitialState: function () {
        return { memberCode: 'andyqatuk', isMobile: false };
    },
    handleTextChange: function (e) {
        this.setState({ memberCode: e.target.value });
    },
    handleIsMobileChange: function (e) {
        this.setState({ isMobile: e.target.checked });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var memberCode = this.state.memberCode.trim();
        var channel = this.state.isMobile ? 2 : 1;
        $.ajax({
            url: '/api/getNetentSessionId',
            dataType: 'json',
            cache: false,
            data: {membercode:memberCode,channel:channel},
            success: function (sessionId) {
                console.log(sessionId);
                this.setState({ sessionId: sessionId });
            }.bind(this),
            error: function (err) {
                console.error(err);
            }.bind(this)
        });
    },
    render: function () {
        return (
            <form className="col-xs-6" onSubmit={this.handleSubmit}>
            <h2 className="page-header">GetSessionId</h2>
                <div className="form-group">
                    <label for="memberCode">MemberCode</label>
                    <input type="text" className="form-control" id="memberCode" placeholder="memberCode"
                        value={this.state.memberCode} onChange={this.handleTextChange}/>
                </div>
                <div className="form-group">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value={this.state.isMobile} onChange={this.handleIsMobileChange}/>
                            isMobile
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
                <h4>SessionId : {this.state.sessionId}</h4>
            </form>
        );
    }
});

var container = document.querySelector("#container");
ReactDOM.render(<GetSessionIdForm/>, container);