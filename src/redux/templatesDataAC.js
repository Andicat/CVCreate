const TEMPLATE_LOAD = 'TEMPLATE_LOAD';

const templates_load = function(data) {
    return {
        type: TEMPLATE_LOAD,
        data: data,
    };
}

export { templates_load, TEMPLATE_LOAD }
