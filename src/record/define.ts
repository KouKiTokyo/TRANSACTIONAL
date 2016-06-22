
export function createAttribute( value, name ){
    const typeSpec = createSpec( value, name ),
          { type } = typeSpec;

    return type ? new type._attribute( typeSpec ) : new AnyType( typeSpec );
}

export function createAttributes( rawSpec ){
    return transform( {}, rawSpec, createAttribute );
}

export function createProperties( attributes ){
    return transform( {}, attributes, attr => attr.createProperty() );
}

// Compile attributes spec
export function compile( spec ){
    const { attributes, parse, toJSON } = spec;

    const Attributes = cloneCtor( attributes ),
          attrToJSON = toJSON( attributes ),
          { AssignDefaults, CreateDefaults } = defaults( attributes );

    return {
        Attributes : Attributes,
        _attributes : new Attributes( attributes ),
        forEach : forEach( attributes ),

        defaults : function( attrs ){
            return attrs ?
                       new AssignDefaults( attrs, this._attributes ) :
                       new CreateDefaults( this._attributes );
        },

        toJSON : function(){
            return toJSON( this, this.attributes, this._attributes );
        },

        parse : function( data ){
            return parse( this, data, this._attributes)
        }
    }
}