import NavbarUser from "../components/Navbar/NavbarUser"
import { Row, Col, Button } from "react-bootstrap"
import trash from '../assets/trash.svg'
import { useShoppingCart } from "use-shopping-cart"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { API } from "../config/api"
import { UserContext } from '../context/userContext'
import convertRp from 'rupiah-format'

function Cart() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const { cartCount, cartDetails, removeItem, totalPrice, clearCart } = useShoppingCart();
    let keys = Object.keys(cartDetails);
    const entries = Object.entries(cartDetails);

      // Create config Snap payment page with useEffect here ...
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-M9jH4MYrAGpr-E7mc";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [])

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      keys = keys.map(function(x){
      return parseInt(x);
    });

      const data = {
        totalpayment: totalPrice,
        booksId: keys
      };
    
      const body = JSON.stringify(data);

      const response = await API.post('/transaction', body, config);

      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/user/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/user/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      })
    } catch (error) {
      console.log(error);
    }
  });


    return (
        <>
            <div>
                <div className="backgroundImageFull">
                    <NavbarUser />
                    <div style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                        <Row>
                            <h3 className="sentenceHead" style={{ textAlign: "left", fontWeight: "bold", marginBottom: "30px" }}> My Cart</h3>
                            <h5 style={{ textAlign: "left", marginBottom: "20px" }}> Review Your Order</h5>
                            <Col sm={7} style={{ paddingLeft: '30px', paddingRight: '30px', borderTop: "2px solid black", borderBottom: "2px solid black" }}>
                                {entries.map((item) => (
                                    <Row className="p-3" key={item[1].id}>
                                        <Col sm={5}>
                                            <div className="justify-content-end d-flex me-0">
                                                <img src={item[1].image} alt="" className="booksImageDetail" />
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={10}>
                                                    <p className='bookTitle' style={{ marginTop: '5px', marginBottom: '5px' }}>{item[1].name}</p>
                                                    <p className='bookAuthorDetail text-muted mb-4'>{item[1].author}</p>
                                                    <p className='detailSentence text-success mb-2' style={{ fontWeight: 'bold' }}>{convertRp.convert(item[1].price)}</p>
                                                </Col>
                                                <Col sm={2}>
                                                    <div className="justify-content-end d-flex">
                                                        <Button style={{ backgroundColor: "transparent", borderColor: "transparent", width: '100%', alignItems: 'center' }} onClick={() => removeItem(item[0])}><img src={trash} style={{ marginLeft: "-0.1rem" }} alt="" /></Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                            <Col>
                                <div sm={4} style={{ borderTop: "2px solid black", borderBottom: "2px solid black"}} className="p-3">
                                    <Row>
                                        <Col sm={8}>
                                            Subtotal
                                        </Col>
                                        <Col sm={4} style={{ textAlign: "end" }}>
                                            {convertRp.convert(totalPrice)}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={8}>
                                            Qty
                                        </Col>
                                        <Col sm={4} style={{ textAlign: "end" }}>
                                            {cartCount}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="p-3">
                                    <Row className="text-success" style={{ fontWeight: "bold" }}>
                                        <Col sm={8}>
                                            Total
                                        </Col>
                                        <Col sm={4} style={{ textAlign: "end" }}>
                                            {convertRp.convert(totalPrice)}
                                        </Col>
                                    </Row>
                                    <div className="justify-content-center d-flex mt-5">
                                        <Button onClick={(e) => handleBuy.mutate(e)} variant="dark" style={{ borderRadius: '5', width: '80%', alignItems: 'center', marginBottom: '10px' }}> Pay </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;