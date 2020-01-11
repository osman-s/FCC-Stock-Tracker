import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function issuePost({ title, text, createdby, assignedto, status }) {
  return http.post(apiEndpoint, {
    title: title,
    text: text,
    createdby: createdby,
    assignedto: assignedto,
    status: status
  });
}
export function issueUpdate({
  _id,
  title,
  text,
  createdby,
  assignedto,
  status,
  state
}) {
  return http.put(apiEndpoint, {
    _id: _id,
    title: title,
    text: text,
    createdby: createdby,
    assignedto: assignedto,
    status: status,
    state: state
  });
}

export function issueDelete({ _id }) {
  console.log(_id);
  return http.delete(apiEndpoint, {
    data: { _id: _id }
  });
}
export function getPosts() {
  return http.get(apiEndpoint);
}
