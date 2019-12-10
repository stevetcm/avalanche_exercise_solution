import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Users from './Users';

export default class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProject: null,
      showCompany: null,
    };

    this.setProject = this.setProject.bind(this);
    this.setCompany = this.setCompany.bind(this);
  }

  setProject(value) {
    return () => {
      this.setState({ showProject: value });
    };
  }

  setCompany(value) {
  	return () => {
  		this.setState({ showCompany: value });
  	}
  }

  showProject() {
    if (this.state.showProject !== null) {
      return (
        <Fragment>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2">
              {`${this.state.showProject.name} Chart`}
            </Typography>
          </div>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={['Year 1', 'Year 2', 'Year 3', 'Year 4']}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => (`$${x}`)}
            />
            <VictoryBar
              data={this.state.showProject.data}
              x="year"
              y="revenue"
            />
          </VictoryChart>
        </Fragment>);
    }

    return null;
  }

  showProjects() {
  	if (this.state.showCompany !== null) {
  	  return (
  	    <List>
  	      {this.state.showCompany.projects.map((project, index) =>
  	        (
  	      	  <ListItem
              	button
              	selected={project === this.state.showProject}
              	onClick={this.setProject(project)}
           	  >
  	          	<Typography variant="button" component="span">{project.name}</Typography>
  	          </ListItem>
  	        ))}
  	    </List>);
  	}

  	return null;
  }

  render() {
    return (
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={3}>
          <List>
            {this.props.companies.map((company, index) =>
              (
                <ListItem
                  button
              	  selected={company === this.state.showCompany}
              	  onClick={this.setCompany(company)}
            	>
                  <Typography variant="button" component="span">{company.name}</Typography>
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item xs={3}>
          {this.showProjects()}
        </Grid>
        <Grid item xs={6}>
          {this.showProject()}
        </Grid>
        <Grid item xs={12}>
          {this.state.showCompany !== null && <Users profiles={this.state.showCompany.profiles} /> }
        </Grid>
      </Grid>
    );
  }
}

Companies.defaultProps = {
  companies: null,
};

Companies.propTypes = {	
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    projects: PropTypes.object,
    profiles: PropTypes.object,
  })),
};
