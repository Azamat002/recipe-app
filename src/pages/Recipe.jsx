import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import './../Styles/Recipe.css'
import defaultImage from './../Images/Image_not_available.png'

const Recipe = () => {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData)
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])


    return <DetailedWrapper>
        <div className='container'>
            <h2>{details.title}</h2>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <div className='info__section'>

                {/*<div>*/}
                {/*    /!* here must be default image or details.image if exists  *!/*/}
                {/*    <img src={details.image} />*/}
                {/*</div>*/}
                <div>
                    {details.image ? (
                        <img src={details.image} alt={details.title}/>
                    ) : (
                        <img src={defaultImage} alt="Default" style={{
                            resizeMode: 'cover',
                            height: 225,
                            width: 450,
                            borderRadius: 15
                        }}/>
                    )}
                </div>


                <Info>
                    <Button className={activeTab === 'instructions' ? 'active' : ''}
                            onClick={() => setActiveTab('instructions')}>Instructions</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''}
                            onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                    {activeTab === 'instructions' && (
                        <div>
                            {/* with html tags*/}
                            {/*<h3>{details.summary}</h3>*/}
                            {/* without html tags*/}
                            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                        </div>
                    )}

                    {activeTab === 'ingredients' && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    )}
                </Info>
            </div>
        </div>
    </DetailedWrapper>

}

const DetailedWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  h3{
    text-align: justify;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }

`


const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 2rem;
  width: 50%;

  h3{
    font-weight: 400;
    text-align: justify;
  }
  ul{
    font-weight: 400;
  }
`

const LeftSide = styled.div`
  width: 50%;
`
export default Recipe;