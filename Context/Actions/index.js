import axios from 'axios';

export default {
  onLunchPickerChange: function(itemValue, itemIndex) {
    this.setState({lunchValue: itemValue});
  },
  onSessionPickerChange: function(itemValue, itemIndex) {
    this.setState({sessionValue: itemValue});
  },
  handleBarCodeRead: function(data, lunch) {
    this.setState({qrCodeValue: data, loading: true});

    if(lunch === "LUNCH 1") {
      var settings = {
           url : 'http://register.ieeeaditsb.com/api/qrcode/day1/lunch',
           method : 'post',
           data : {hash: data}
         };
    } else {
      var settings = {
           url : 'http://register.ieeeaditsb.com/api/qrcode/day2/lunch',
           method : 'post',
           data : {hash: data}
         };
    }

      axios( settings ).then((res)=>{
        console.log(res.data);

        if( res.data.name === null ) {
          this.setState({
            loading: false,
            responseMessage: res.data.message,
            success: false,
            error: true
          });
        } else {
          this.setState({
            loading: false,
            qrName: res.data.name,
            responseMessage: res.data.message,
            success: true
          });
        }

      }).catch((err)=>{
        this.setState({loading: false, error: true});
        console.log(err);
      });

    //setTimeout(()=>this.setState({loading: false}), 2000 );
  },
  handleBarCodeReadSession: function(data, session) {
    this.setState({qrCodeValueSession: data, loading: true});

    if( session === "SESSION 1" ) {
      var settings = {
           url : 'http://register.ieeeaditsb.com/api/qrcode/day1/registration',
           method : 'post',
           data : {hash: data}
         };
    } else {
      var settings = {
           url : 'http://register.ieeeaditsb.com/api/qrcode/day2/registration',
           method : 'post',
           data : {hash: data}
         };
    }

    axios( settings ).then((res)=>{
      console.log(res.data);

      if( res.data.name === null ) {
        this.setState({
          loading: false,
          responseMessageSession: res.data.message,
          success: false,
          error: true
        });
      } else {
        this.setState({
          loading: false,
          qrNameSession: res.data.name,
          responseMessageSession: res.data.message,
          success: true
        });
      }

    }).catch((err)=>{
      this.setState({loading: false, error: true});
      console.log(err);
    });

  },

  onClickNextButton: function() {
    this.setState({
      qrCodeValueSession: null,
      qrCodeValue: null,
      loading: false,
      error: false,
      success: false,
      qrName: null,
      responseMessage: null,
      responseMessageSession: null,
      qrNameSession: null
    })
  }
}
