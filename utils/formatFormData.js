const formatData = (data) => {
	const params = {}
	data.forEach((i) => {
        const values = i.split(`=`);

        if(values && values[0]) {
            const key = values[0].replace(/\+/g, ' ')
            let value = values[1].replace(/\+/g, ' ')
            
            params[key] = value.replace(/,/g, '');
        }
	});

	return params
}

module.exports = formatData