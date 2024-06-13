import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function MultiTabApp() {
    const embeddables = {
        filterEmbeddableId: '1da33060-5cfc-4ab1-82a4-3e79ef21d9d9',
        embeddableTab1: '90b09ae1-c83a-4e11-88c1-1624fc9d6051',
        embeddableTab2: '7d4f3a94-f0d0-4927-a28a-84982147c4c2',
        embeddableTab3: '13354184-9407-434a-ab16-29b875cee400'
    };

    const [tokens, setTokens] = React.useState({});
    const [filtersReady, setFiltersReady] = React.useState(false);
    const [variables, setVariables] = React.useState({
        country: null,
        date: null
    })

    const updateVariable = (newVariables) => {
        setVariables((prev) => ({...prev, ...newVariables}));
    }

    React.useEffect(() => {
        Object.keys(embeddables).forEach((key) => {
            fetch(`/token?embeddableId=${embeddables[key]}`)
                .then((res) => res.json())
                .then((json) => setTokens((prev) => ({ ...prev, [key]: json.token })));
        });
    }, []);

    const Dashboards = (
        <Tabs forceRenderTabPanel={true}>
            <TabList>
                <Tab>Order summary</Tab>
                <Tab>Product summary</Tab>
                <Tab>Orders per day</Tab>
            </TabList>
            <TabPanel>
                <Embeddable token={tokens.embeddableTab1} variables={variables} />
            </TabPanel>
            <TabPanel>
                <Embeddable token={tokens.embeddableTab2} variables={variables} />
            </TabPanel>
            <TabPanel>
                <Embeddable token={tokens.embeddableTab3} variables={variables} />
            </TabPanel>
        </Tabs>
    )

    return (
        <div style={{width: '90%', margin: '20px'}}>
            <Embeddable token={tokens.filterEmbeddableId} style={{position: 'relative', zIndex: 2}}
                        onVariablesChange={updateVariable} onComponentsLoad={() => setFiltersReady(true)} />
            {!filtersReady && (<div> Loading ... </div>)}
            {filtersReady && Dashboards}
        </div>

    );
}

function Embeddable({token, onComponentsLoad, variables, onVariablesChange, style}) {
    const ref = React.useRef(null);
    function handleVariableChange(e) {
        if(onVariablesChange) {
            onVariablesChange(
                Object.fromEntries(
                    e.detail.map(c => [c.variableName, c.newValue])
                )
            )
        }
    }
    React.useEffect(() => {
        ref.current.addEventListener('variablesChange', handleVariableChange);
        ref.current.addEventListener('componentsLoad', onComponentsLoad);
        return () => {
            ref.current.removeEventListener('componentsLoad', onComponentsLoad);
            ref.current.removeEventListener('variablesChange', handleVariableChange);
        };
    }, []);
    return React.createElement('em-beddable', {
        ref,
        token,
        style: style,
        variables: JSON.stringify(variables)
    });
}

export default MultiTabApp;