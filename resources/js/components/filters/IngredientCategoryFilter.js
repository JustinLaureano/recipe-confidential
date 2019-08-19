import React from 'react';
import { connect } from 'react-redux';
import { changeTablePage, addIngredientCategoryFilter, removeIngredientCategoryFilter } from '../../actions/filters';

export class IngredientCategoryFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            ingredient_categories: this.props.ingredient_categories,
            filteredCategories: this.props.filteredCategories
        }
    }

    componentDidUpdate() {
        if (this.state.ingredient_categories.length !== this.props.ingredient_categories.length) {
            this.setState({ ingredient_categories: this.props.ingredient_categories });
        }
        
        if (this.state.filteredCategories.length !== this.props.filteredCategories.length) {
            this.setState({ filteredCategories: this.props.filteredCategories });
        }
        
        if (this.state.menuOpen) {
            document.addEventListener('click', this.clickEvent);
        }
        else {
            document.removeEventListener('click', this.clickEvent);
        }
    }

    clickEvent = (e) => {
        if (!e.target.id.includes('category_') && this.state.menuOpen) {
            // mouse click was outside the category menu, so close the menu
            this.setState({ menuOpen: false });
        }
    }

    toggleCategoryFilterMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    toggleCategoryOption = (e) => {
        const ingredientCategoryId = e.target.id.replace(/\D/g, '');

        e.target.className.includes('filter__suggestion--selected') ?
            this.props.removeIngredientCategoryFilter( parseInt(ingredientCategoryId) ) :
            this.props.addIngredientCategoryFilter( parseInt(ingredientCategoryId) );

        this.props.changeTablePage(1, 'ingredient');
    }

	render() {
		return (
            <div className="filter">
                <button className="filter__btn" onClick={ this.toggleCategoryFilterMenu }>
                Category
                <i className="material-icons dropdown-icon">arrow_drop_down</i>
                </button>
                <div className={ "filter__suggestions" + (this.state.menuOpen ? '' : ' display--none') }>
                    {
                        this.state.ingredient_categories.map((category) => {
                            return (
                                <div
                                    key={ "category_" + category.id }
                                    id={ "category_" + category.id }
                                    onClick={ this.toggleCategoryOption }
                                    className={ this.state.filteredCategories.includes(category.id) ? ' filter__suggestion--selected' : 'filter__suggestion' }>
                                    { category.name }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
		);
	};
};

const mapStateToProps = (state) => ({
    ingredient_categories: state.ingredient_categories,
    filteredCategories: state.filters.ingredient_category
});

const mapDispatchToProps = (dispatch) => ({
    changeTablePage: (pageNumber, model) => dispatch(changeTablePage(pageNumber, model)),
    addIngredientCategoryFilter: (ingredientCategoryId) => dispatch(addIngredientCategoryFilter(ingredientCategoryId)),
    removeIngredientCategoryFilter: (ingredientCategoryId) => dispatch(removeIngredientCategoryFilter(ingredientCategoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCategoryFilter);
