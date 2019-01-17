import React  from 'react';
const Departements= ({handleChange,value})=>{
    return (
        <div className="form-group">
                <label className="control-label">Catégorie* </label>
                    <select required name="departements_id" onChange={handleChange} value={value}>
                        <option name="departements_id" value="">Sélectionner la catégorie.</option>
                        <option name="departements_id" value="1">Paris Centre</option>
                        <option name="departements_id" value="2">Paris Nord</option>
                        <option name="departements_id" value="3">Paris Est</option>
                        <option name="departements_id" value="4">Paris Sud</option>
                        <option name="departements_id" value="5">Paris Ouest</option>
                        <option name="departements_id" value="6">Banlieue</option>
                    </select>
            </div>
    )
}
export default Departements;
