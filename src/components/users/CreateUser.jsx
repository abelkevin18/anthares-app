import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateUser = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
  
    try {
      const response = await fetch('http://localhost:9000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        Swal.fire('¡Éxito!', 'Cliente registrado correctamente', 'success').then(() => {
          navigate('/users/list')
        })
        e.target.reset()
      } else {
        Swal.fire('Error', 'Error al registrar cliente', 'error')
      }
    } catch (error) {
      Swal.fire('Error de conexión', '', 'error')
    }
  }
  
  return (
    <>
      <div className="mt-5">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">REGISTRAR CLIENTE</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Razón Social*:</label>
                    <input type="text" className="form-control" name="companyName"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Responsable a cargo:</label>
                    <input type="text" className="form-control" name="generalManager"/>
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">RUC:</label>
                    <input type="text" className="form-control" name="ruc"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">DNI:</label>
                    <input type="text" className="form-control" name="dni"/>
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Usuario Sol:</label>
                    <input type="text" className="form-control" name="sunatUser"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Clave Sol:</label>
                    <input type="text" className="form-control" name="sunatPassword"/>
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Celular:</label>
                    <input type="text" className="form-control" name="phoneNumber"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Correo:</label>
                    <input type="text" className="form-control" name="email"/>
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Régimen</label>
                    <select className="form-select" name="regime">
                      <option>RUS</option>
                      <option>RER</option>
                      <option>RMT</option>
                      <option>RG</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Clave RNP:</label>
                    <input type="text" className="form-control" name="rnpPassword"/>
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Usuario Afp:</label>
                    <input type="text" className="form-control" name="afpUser"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Clave Afp Net:</label>
                    <input type="text" className="form-control" name="afpPassword"/>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
