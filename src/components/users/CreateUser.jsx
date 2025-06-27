
export const CreateUser = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">REGISTRAR CLIENTE</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Razón Social*:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Responsable a cargo:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">RUC:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">DNI:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Usuario:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Clave:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Celular:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Correo:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Régimen</label>
                    <select className="form-select">
                      <option>RUS</option>
                      <option>RER</option>
                      <option>RMT</option>
                      <option>RG</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">RNP:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Usuario Afp:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label className="form-label me-2 mb-0 w-50">Clave Afp Net:</label>
                    <input type="text" className="form-control" />
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
