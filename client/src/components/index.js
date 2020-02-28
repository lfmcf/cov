import React, { Component } from 'react'
import './index.scss';
import {Link} from 'react-router-dom';
import post1 from './assests/images/post-1.jpg'
// import map from './assests/images/homeboy1bg.jpg'
class Home extends Component {

    handleClick() {
        console.log('click');
    }
    render() {
        return (
            <div>   
                <div className="heading">
                    <div className="row">
                        <div className="colmun">
                            <h1 >Et vous, qui allez-vous retrouver ?</h1>
                            <h2>Some text here also</h2>
                            <Link to="/search" className="searchLink">Chercher</Link>
                        </div>
                    </div>
                </div>
                <div className="image_text">
                    <div className="image">
                        {/* <img src={post1} width="100%"/> */}
                    </div>
                    <div className="text">
                        <h1>Vous prenez le volant ? Dites-nous où vous allez !</h1>
                        <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.</p>
                        <button>Proposez un trajet</button>
                    </div>
                </div>
                <div className="infos">
                    <div className="desc">
                        <h1>Allez où vous voulez. D'où vous voulez.</h1>
                        <div className="desc_cols">
                            <div>
                                <h3>Pratique</h3>
                                <p>Trouvez rapidement un covoiturage ou un bus à proximité parmi les millions de trajets proposés.</p>
                            </div>
                            <div>
                                <h3>Facile</h3>
                                <p>Trouvez le trajet parfait ! Il vous suffit d’entrer votre adresse exacte, de choisir le voyage qui vous convient le mieux, et de réserver.</p>
                            </div>
                            <div>
                                <h3>Direct</h3>
                                <p>Que vous prévoyiez à l’avance ou réserviez en dernière minute, vous trouverez toujours un tarif avantageux.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;