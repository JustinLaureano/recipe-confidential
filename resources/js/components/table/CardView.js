import React from 'react';
import CategoryCard from '../card/CategoryCard';
import CuisineCard from '../card/CuisineCard';

export class CardView extends React.Component {
	render() {
        if (this.props.cards.length > 0) {
            switch(this.props.type) {
                case 'category':
                    return (
                        <section className="cards">
                        {
                            this.props.cards.map((category, index) => {
                                return (
                                    <CategoryCard 
                                        key={ "category-card_" + index } 
                                        index={ index }
                                        total={ this.props.totals[index] ? this.props.totals[index].count : null }
                                        { ...category } />
                                )
                            })
                        }
                        </section>
                    )
                    case 'cuisine':
                            return (
                                <section className="cards">
                                {
                                    this.props.cards.map((cuisine, index) => {
                                        return (
                                            <CuisineCard 
                                                key={ "category-card_" + index } 
                                                index={ index }
                                                total={ this.props.totals[index] ? this.props.totals[index].count : null }
                                                { ...cuisine } />
                                        )
                                    })
                                }
                                </section>
                            )
            }

        }
        else {
            return (
                <h2>No Cards</h2>
            )
        }
	}
}

export default CardView;