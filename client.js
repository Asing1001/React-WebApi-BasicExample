class GetSessionIdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberCode: 'andyqatuk', isMobile: false };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleIsMobileChange = this.handleIsMobileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleTextChange(e) {
        this.setState({ memberCode: e.target.value });
    }
    handleIsMobileChange(e) {
        this.setState({ isMobile: e.target.checked });
    }
    handleSubmit(e) {
        e.preventDefault();
        var memberCode = this.state.memberCode.trim();
        var channel = this.state.isMobile ? 2 : 1;
        $.ajax({
            url: '/api/getNetentSessionId',
            dataType: 'json',
            data: { membercode: memberCode, channel: channel },
            success: function (sessionId) {
                console.log(sessionId);
                this.setState({ sessionId: sessionId });
            }.bind(this),
            error: function (err) {
                console.error(err);
            }.bind(this)
        });
    }
    render() {
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
                <h4>SessionId: {this.state.sessionId}</h4>
            </form>
        );
    }
};

var container = document.querySelector("#container");
ReactDOM.render(<GetSessionIdForm/>, container);