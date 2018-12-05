import React  from 'react';
const Departements= ({handleChange,value})=>{
    return (
        <div className="form-group">
                <label class="control-label">Departement* </label>
                    <select required name="departements_id" onChange={handleChange} value={value}>
                        <option name="departements_id" value="">Sélectionner le dépt.</option>
                        <option name="departements_id" value="1">75 Paris</option>
                        <option name="departements_id" value="2">77 Seine-et-Marne</option>
                        <option name="departements_id" value="3">78 Yvelines</option>
                        <option name="departements_id" value="4">91 Essonne</option>
                        <option name="departements_id" value="5">92 Hauts-de-Seine</option>
                        <option name="departements_id" value="6">93 Seine-St-Denis</option>
                        <option name="departements_id" value="7">94 Val-de-Marne</option>
                        <option name="departements_id" value="8">95 Val-d'Oise</option>
                    </select>
            </div>
    )
}
export default Departements;
